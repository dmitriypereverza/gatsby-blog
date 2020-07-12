import React, { useState } from "react";
import styled from "styled-components";
import { is } from "ramda";

import EditableLargeTextInput from "components/EditableInputs/Textarea";

import {
  border,
  borderRadius,
  color,
  fullWidth,
  getColor,
  height,
  noWrapText,
  padding,
  paddingLeft,
} from "libs/styles";

import Typography from "../Typography";
import Button, { ButtonType } from "../Button";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid transparent;
  width: 100%;
  tr {
    border-bottom: 1px solid ${getColor("dimmedBlue1")};
  }

  tbody tr {
    :last-child {
      background-color: transparent;
      border-bottom: none;
    }
  }

  th {
    padding: 10px 34px 10px 0;
  }

  td {
    padding: 14px 34px 14px 0;
  }

  th {
    text-align: start;
  }

  tr td:last-child {
    width: 100%;
  }
`;

interface TableInterface {
  headers?: string[];
  rows: (string | (() => React.ReactNode))[][];
  sizes: string[];
  incrementStep?: number;
  editable?: boolean;
  onOpenEditMode?: (isOpen: boolean) => void;
  onChange?: (data: string[][]) => void;
}

const dataDoesntExist = (
  <Typography
    type="regularBody1"
    useDotes
    styles={[color("dimmedBlue2"), padding(0)]}
  >
    Нет данных
  </Typography>
);

const renderViewRow = (rowTitle) => {
  return (
    <>
      {rowTitle ? (
        <Typography type="regularBody1" styles={[color("dimmedBlue4")]}>
          {rowTitle}
        </Typography>
      ) : (
        dataDoesntExist
      )}
    </>
  );
};

const SimpleTable = ({
  rows,
  headers,
  sizes,
  incrementStep,
  editable,
  onChange,
  onOpenEditMode,
}: TableInterface) => {
  const [rowsValues, setRows] = useState(rows);
  const [openedElementsCount, setOpenedElementsCount] = useState(incrementStep);

  const [editableField, setEditableField] = useState(null);
  const onOpenFieldEditMode = (fieldCode) => (isOpen: boolean) =>
    setEditableField(isOpen ? fieldCode : null);
  const canFieldShowEditMode = (fieldCode) =>
    !editableField || editableField === fieldCode;

  const renderEditableViewRow = (rowTitle, rowIndex, fieldIndex) => (
    <EditableLargeTextInput
      onOpenEditMode={(isOpen) => {
        onOpenEditMode(isOpen);
        onOpenFieldEditMode(rowIndex + ":" + fieldIndex)(isOpen);
      }}
      initialValue={rowTitle}
      inputStyles={[fullWidth, height(40)]}
      onlyView={!canFieldShowEditMode(rowIndex + ":" + fieldIndex)}
      emptyElement={() => (
        <Typography type="regularBody1" styles={[color("dimmedBlue2")]}>
          Нет данных
        </Typography>
      )}
      onFinishChange={(value) => {
        const list = rowsValues.map((row, i) => {
          if (rowIndex !== i) {
            return row;
          }
          row[fieldIndex] = value;
          return [...row];
        });
        setRows(list);
        if (onChange) {
          onChange(list as string[][]);
        }
      }}
    />
  );

  return (
    <Table>
      <thead>
        <tr>
          {headers.map((title, index) => (
            <th key={title} style={sizes[index] ? { width: sizes[index] } : {}}>
              <Typography
                type="mediumBody1"
                styles={[color("dimmedBlue2"), noWrapText]}
              >
                {title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsValues.slice(0, openedElementsCount).map((rowTitles, index) => (
          <tr key={index}>
            {rowTitles.map((rowTitle, fieldIndex) => {
              const isString = is(String, rowTitle);
              const rowTitleResult = isString
                ? rowTitle
                : (rowTitle as Function)();
              return (
                <td key={fieldIndex}>
                  {editable
                    ? renderEditableViewRow(rowTitleResult, index, fieldIndex)
                    : isString
                    ? renderViewRow(rowTitleResult)
                    : rowTitleResult || dataDoesntExist}
                </td>
              );
            })}
            {new Array(headers.length - rowTitles.length).fill("").map(() => (
              <td key={index} />
            ))}
          </tr>
        ))}
        {rowsValues.length > incrementStep ? (
          <tr>
            <td colSpan={headers.length}>
              {openedElementsCount < rowsValues.length ? (
                <Button
                  outerStyles={[paddingLeft(0)]}
                  type={ButtonType.text}
                  iconStyles={[border(1, "dimmedBlue1"), borderRadius(4)]}
                  iconLeft="arrowDown"
                  onClick={() =>
                    setOpenedElementsCount(openedElementsCount + incrementStep)
                  }
                >
                  Больше записей
                </Button>
              ) : (
                <Button
                  outerStyles={[paddingLeft(0)]}
                  type={ButtonType.text}
                  iconStyles={[border(1, "dimmedBlue1"), borderRadius(4)]}
                  iconLeft="arrowUp"
                  onClick={() =>
                    setOpenedElementsCount(
                      Math.max(
                        openedElementsCount - incrementStep,
                        incrementStep,
                      ),
                    )
                  }
                >
                  Меньше записей
                </Button>
              )}
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  );
};

SimpleTable.defaultProps = {
  headers: [],
  sizes: [],
  incrementStep: 5,
  editable: false,
};

export default React.memo(SimpleTable);
