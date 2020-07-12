---
title: Декларативная фильтрация данных на фронте. JS/TS
date: "2020-03-11T22:13:15.284Z"
description: "Часто ли вам приходилось писать обработчики фильтрации для ваших данных? Это могут быть массивы для отрисовки таблиц, карточек, списков — чего угодно. Когда фильтрация статическая, то тут все просто. Стандартных функций map, filter и reduce вполне достаточно. Но что делать, если данные имеют сложную структуру или вложенность, да еще и правил для фильтра может быть достаточно много. Правила могут повторяться, данные изменяться, и чем больше контролов фильтра будет появляться, тем сложнее и неустойчивее будет код обработчика. Как же решить проблему возрастающей сложности?"
image: "https://habrastorage.org/webt/tg/oe/vx/tgoevxjfh91r8a7v7syb7n7uthg.png"
---

![](https://habrastorage.org/webt/tg/oe/vx/tgoevxjfh91r8a7v7syb7n7uthg.png)

Часто ли вам приходилось писать обработчики фильтрации для ваших данных? Это могут быть массивы для отрисовки таблиц, карточек, списков - чего угодно.

Когда фильтрация статическая, то тут все просто. Стандартных функций `map`, `filter` и `reduce` вполне достаточно. Но что делать, если данные имеют сложную структуру или вложенность, да еще и правил для фильтра может быть достаточно много. Правила могут повторяться, данные изменяться, и чем больше контролов фильтра будет появляться, тем сложнее и неустойчивее будет код обработчика.

Как же решить проблему возрастающей сложности?

<cut/>

Я сам столкнулся с данной проблемой, разрабатывая приложение, которое работает с огромным количеством данных. Постепенно добавлялись все новые и новые фильтры.

Поначалу все шло хорошо, отдельные обработчики фильтров выполняли свои задачи отлично. Со временем стали появляться страницы с незначительными изменениями в уже готовых фильтрах. Код дублировать не хотелось, так что пришлось выделять особенные варианты фильтра и его обработчика. Типовая страница собиралась за час, но вот обработчики для фильтров писались в два раза дольше. Нужно было что-то делать.

В свободное время я пробовал найти библиотеки, которые могли бы помочь решить эту проблему. 
Самые значимые библиотеки, которые удалось найти:
1.  `ng-table` - отрисовывает таблицы и предоставляет возможность простой фильтрации и сортировки. Фильтрации у нас были намного сложнее.
2. `List.js` - как ng-table, только намного меньше функционала.
3. `filter.js` - близко к тому, что было нужно, но не хватало гибкости.
4. `Isotope` - привязывается к DOM элементам. У нас же просто данные.

Нужно было разработать собственное решение, удовлетворяющее следующим требованиям:
1.  Декларативное описание работы фильтра.
2.  Переиспользуемые правила.
3.  Возможность написания своих правил фильтрации.
4.  Композиция правил как в обычных условиях, с помощью `and` и `or` операторов.
5.  Фильтрация вложенных элементов и групп. Вложенность не фиксированная.
6.  Возможность задать стратегию фильтрации (к примеру, мы хотим, чтобы, если группа совпала с фильтром, но не совпал ни один из её элементов, все равно вывелась группа со всеми элементами)

В итоге мы имеем библиотеку [awesome-data-filter](https://github.com/dmitriypereverza/awsome-data-filter).

Данная библиотека, используя декларативный подход, позволяет составлять сложные правила обработки ваших данных.

## Установка

Сначала поставим библиотеку и опробуем ее в действии.

```text
npm install awesome-data-filter
``` 
Начнем с простого примера.
Предположим, у нас есть следующий массив пользователей:

```javascript
const users = [
  {
    age: 31,
    name: "Marina Gilmore",
  },
  {
    age: 34,
    name: "Joyner Mccray",
  },
  {
    age: 23,
    name: "Inez Copeland",
  },
  {
    age: 23,
    name: "Marina Mitchell",
  },
  {
    age: 25,
    name: "Prince Spears",
  },
];
```

И объект со значениями фильтра:

```javascript
const filterValue = {
  age: 23,
  searchText: "mari",
};
```

Допустим, нужно найти пересечение этих правил.

Используемые правила:
 - `matchText` - поиск подстроки в целевом поле;
 - `equalProp` - полное совпадение значений параметров;
- `betweenDates` - проверяет вхождение определенной даты в диапазон;
- `equalOneOf` - хотя бы один из переданных элементов должен соответствовать переданному правилу;
- `someInArray` - хотя бы один из вложенных элементов объекта должен соответствовать переданному правилу;
- `isEmptyArray` - проверка на пустой массив;
- `lessThen` - значение меньше, чем;
- `moreThen` - значение больше, чем;
- `not` - функция отрицания возвращаемого функцией значения.

В наших примерах мы будем использовать только `matchText` и `equalProp`.

Для получения динамических значений:
 - `filterField` - получение свойства фильтра;
 - `elementField` - получение свойства текущего элемента списка.

```javascript
import { 
  buildFilter, 
  elementField, 
  filterField, 
} from "awsome-data-filter";
import { matchText, equalProp } from "awsome-data-filter/rules";
import { and } from "awsome-data-filter/conditions";

const filter = buildFilter({
    rules: {
      elementFilter: and([
        matchText(filterField("searchText"), elementField("name")),
        equalProp(filterField("age"), elementField("age")),
      ]),
    },
  });

const { elements } = filter(
    filterValue,
    {
      groups: [],
      elements: users,
    },
);

console.log(elements);
// elements: [{ age: 23, name: "Marina Mitchell" }]
```

Полученная функция `filter` принимает объект со значениями фильтра и фильтруемые данные в формате `groups` и `elements`.

Так как группы обрабатываются отдельно от элементов, они вынесены в отдельное поле. Внутри групп также могут находиться элементы.

![](https://habrastorage.org/webt/ff/0h/d1/ff0hd1m-m9wk2gmemzlfg_qjdem.png)

В данном случае, так как у нас плоский список элементов, передаем только `elements`.

Если же заменим `and` на `or`, то получим объединение результатов работы 2х правил.

```javascript
import { 
  buildFilter, 
  elementField, 
  filterField, 
} from "awsome-data-filter";
import { matchText, equalProp } from "awsome-data-filter/rules";
import { or } from "awsome-data-filter/conditions";

const filter = buildFilter({
    rules: {
      elementFilter: or([
        matchText(filterField("searchText"), elementField("name")),
        equalProp(filterField("age"), elementField("age")),
      ]),
    },
  });

const { elements } = filter(
    filterValue,
    {
      groups: [],
      elements: users,
    },
);

console.log(elements);
// elements: 
// [
//   {
//     age: 31,
//     name: "Marina Gilmore",
//   },
//   {
//     age: 23,
//     name: "Inez Copeland",
//   },
//   {
//     age: 23,
//     name: "Marina Mitchell",
//   }
// ]
```

Благодаря функциям `filterField`, `elementField` мы можем динамически передавать параметры в созданные правила.

Так же есть функция `constValue` для передачи константных значений.
Условия могут вкладываться друг в друга ``or(..., matchText, [and([..., matchText, ...]), or([..., ...])])``

Также фильтр может работать со вложенными элементами и группами. Рассмотрим на примере ниже:


```javascript
const dataList = [
  {
    groupName: "first group",
    list: [
      { age: 31, name: "Marina" },
      { age: 23, name: "Fabio" },
    ],
  },
  {
    groupName: "second group",
    groups: [
      {
        groupName: "third group",
        list: [],
        groups: [
          {
            groupName: "fourth group",
            list: [{ age: 42, name: "Li" }],
          },
        ],
      },
    ],
    list: [
      { age: 41, name: "Marina" },
      { age: 29, name: "Inez" },
      { age: 33, name: "Marina" },
    ],
  },
  {
    groupName: "fifth group",
    list: [
      { age: 21, name: "Dmitriy" },
      { age: 22, name: "Li" },
      { age: 45, name: "Mitchell" },
    ],
  },
];
```

В таком случае можно передать в конфиг фильтра информацию об обходе данной структуры объекта в поле `traversal`: 

```javascript
import { 
  buildFilter, 
  elementField, 
  filterField, 
} from "awsome-data-filter";
import { matchText } from "awsome-data-filter/rules";

const filter = buildFilter({
    traversal: {
      getChildrenFunc: group => group.list, // как получить конечные элементы
      setChildrenFunc: (group, list) => ({ ...group, list }), // как записать конечные элементы в группу
      getGroupsFunc: group => group.groups, // как получить вложенные группы
      setGroupsFunc: (group, groups) => ({ ...group, groups }), // как записать вложенные группы
    },
    rules: {
      elementFilter: matchText(filterField("searchText"), elementField("name")),
    },
  });

const filterValue = {
  searchText: "li",
};

const { groups } = filter(filterValue, {
  groups: dataList, // группы с вложенными элементами и группами
  elements: [], // как элементы можно передавать только плоские списки
});

console.log(groups);
// groups: 
//[
//  {
//    groupName: "second group",
//    groups: [
//      {
//        groupName: "third group",
//        list: [],
//        groups: [
//          {
//            groupName: "fourth group",
//            list: [{ age: 42, name: "Li" }],
//          },
//        ],
//      },
//    ],
//    list: [],
//  },
//  {
//    groupName: "fifth group",
//    list: [
//      { age: 22, name: "Li" },
//    ],
//  },
//]
```

До этого момента передавался только `elementFilter` параметр, который отвечает за правила фильтрации элементов. Также есть `groupFilter` для групп.

```javascript
import { 
  buildFilter, 
  elementField, 
  filterField, 
} from "awsome-data-filter";
import { matchText } from "awsome-data-filter/rules";

const filter = buildFilter({
    traversal: {
      getChildrenFunc: group => group.list, // как получить конечные элементы
      setChildrenFunc: (group, list) => ({ ...group, list }), // как записать конечные элементы в группу
      getGroupsFunc: group => group.groups, // как получить вложенные группы
      setGroupsFunc: (group, groups) => ({ ...group, groups }), // как записать вложенные группы
    },
    rules: {
      elementFilter: matchText(filterField("searchText"), elementField("name")),
      groupFilter: matchText(filterField("groupName"), elementField("groupName")),
    },
  });

const filterValue = {
  searchText: "li",
  groupName: "fi",
};

const { groups } = filter(filterValue, {
  groups: dataList,
  elements: [],
});

console.log(groups);
// groups:
//[
//  {
//    groupName: "first group",
//    list: [
//      { age: 31, name: "Marina" },
//      { age: 23, name: "Fabio" },
//    ],
//  },
//  {
//    groupName: "second group",
//    groups: [
//      {
//        groupName: "third group",
//        list: [],
//        groups: [
//          {
//            groupName: "fourth group",
//            list: [{ age: 42, name: "Li" }],
//          },
//        ],
//      },
//    ],
//    list: [],
//  },
//  {
//    groupName: "fifth group",
//    list: [
//      { age: 22, name: "Li" },
//    ],
//  },
//]
```

Группа с названием `first group` появилась в выборке, и так как фильтр не нашел совпадения по элементам, но нашел совпадение по группе, мы видим отображение всех вложенных элементов списка.
В случае с `fifth group` совпадение было и по элементам, и по группе, поэтому оставляем только один элемент.

Подобные зависимости фильтрации между группами и элементами называются `стратегией фильтрации`. По умолчанию указана следующая стратегия:

```javascript
const standardStrategy: StrategiesFilterInterface = {
  elementHandler: ({ // стратегия на обработку конечных элементов
    element,
    tools: { 
        isGroupFilterIsActive, // есть ли фильтр по группам
        applyElementFilter // функция фильтрации элемента
    },
  }) => {
    if (isGroupFilterIsActive) return null;
    if (!applyElementFilter) return element;
    return applyElementFilter(element, true) ? element : null;
  },
  groupHandler: ({
    element: group,
    originalElement: originalGroup,
    tools: {
      isGroupFilterIsActive,
      applyElementFilter,
      getIsGroupFilterHaveMatch,
      getGroupsFunc,
      getChildrenFunc,
      setChildrenFunc,
    },
  }) => {
    let newChildren = [];
    let originalChildren = [];
    const children = getChildrenFunc(group);
    const childrenExists = !!children;
    // если элементы есть фильтруем их
    if (children) {
      originalChildren = [...children];
      newChildren = originalChildren.filter(element =>
        applyElementFilter
          ? applyElementFilter(element, !isGroupFilterIsActive)
          : !isGroupFilterIsActive,
      );
    }
    // если совпадений по элементам нет, но есть по группе, возвращаем исходный объект
    if (!newChildren.length && getIsGroupFilterHaveMatch(group)) {
      return originalGroup;
    }
    // если совпадения по элементам есть, записываем их в группу
    if (childrenExists) {
      group = setChildrenFunc(group, newChildren);
    }

    // проверка вложенных групп
    const newGroups = getGroupsFunc(group);
    const isGroupsExists = !!(newGroups && newGroups.length);
    const isElementExists = !!(newChildren && newChildren.length);
    // если нет вложенных элементов и групп, то удаляем группу
    return isElementExists || isGroupsExists ? group : null;
  },
};
```

Если стандартная стратегия не подходит для вашего случая, можно написать свою и передать ее в поле фильтра `filterStrategy`.

## Заключение 
Благодаря использованию библиотеки [awesome-data-filter](https://github.com/dmitriypereverza/awsome-data-filter) можно решить проблему со сложностью обработчиков фильтров и улучшить читабельность кода. Теперь можно визуально сравнить графики сложности обоих подходов.

![](https://habrastorage.org/webt/fx/-m/fw/fx-mfwped4vo_jakrhvugi9p36u.png)

Если на вашем проекте не используется много фильтров и проект сам по себе небольшой, то вам не нужна эта библиотека. Остальным же можно пробовать внедрять ее постепенно.

Буду рад вашим комментариям, вопросам и советам.
