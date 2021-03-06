import { FC } from "react";
import { pickAll } from "ramda";

import isEqual from "./isEqual";

export function excludeFromObject(
  object: { [name: string]: any },
  excludeArray: string[],
) {
  return pickAll(
    Object.keys(object).filter(function (propertyName) {
      return !excludeArray.includes(propertyName);
    }),
    object,
  ) as Record<string, any>;
}

/**
 * декоратор для глубокого сравнения объектов в props и ServiceModule
 * @function
 * @param {[]string} ignoreUpdateOnPropNames - игнорировать пропсы с указанными именами при проверке
 * @example
 * @performance(["onClick"])
 * class App extends React.Component {
 *    render() {}
 * }
 */
export default function performance<PROPS>(
  ignoreUpdateOnPropNames: string[] = [],
): (App: any) => FC<PROPS> {
  return function decorator(App) {
    App.prototype.shouldComponentUpdate = function shouldComponentUpdate(
      nextProps,
      nextState,
    ) {
      const propsWithoutIgnored = excludeFromObject(
        this.props,
        ignoreUpdateOnPropNames,
      );
      const nextPropsWithoutIgnored = excludeFromObject(
        nextProps,
        ignoreUpdateOnPropNames,
      );

      return (
        !isEqual(propsWithoutIgnored, nextPropsWithoutIgnored) ||
        !isEqual(this.state, nextState)
      );
    };

    return App;
  };
}
