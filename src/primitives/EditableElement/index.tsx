import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";

import { getColor } from "libs/styles";
import { useBoolean } from "libs/hooks";

const hoverStyles = css`
  :hover {
    background: ${getColor("dimmedBlue1")};
  }
`;

const StyledEditableElement = styled.div<{ needEditHover: boolean }>`
  ${(props) => (props.needEditHover ? hoverStyles : null)};
  border-radius: 4px;
  padding-left: 6px;
  padding-right: 6px;
  display: inline-flex;
`;

export enum Modes {
  EDIT,
  SHOW,
}

interface EditableElementInterface<Value> {
  initialValue: Value;
  styles?: any;
  editModeStyles?: any;
  initialMode?: Modes;
  onlyView?: boolean;
  showView: (value: Value) => React.ReactNode;
  editView: (data: {
    value: Value;
    setValue: (data: Value) => void;
    closeEditMode: () => void;
    cancel: () => void;
  }) => React.ReactNode;
  emptyView?: () => React.ReactNode;
  checkEmptyData?: (value: Value) => boolean;
  onOpenEditMode?: (isOpen: boolean) => void;
}

export default React.memo(
  ({
    editView,
    showView,
    initialValue,
    onlyView = false,
    initialMode,
    styles,
    editModeStyles,
    emptyView,
    onOpenEditMode,
    checkEmptyData,
  }: EditableElementInterface<any>) => {
    const [value, setValue] = useState(initialValue);
    const [editMode, openEditMode, closeEditMode] = useBoolean(
      initialMode === Modes.EDIT,
    );

    useEffect(() => setValue(initialValue), [initialValue]);

    function isEmpty(value) {
      return checkEmptyData ? checkEmptyData(value) : !value;
    }

    const onOpenEditModeHandler = () => {
      if (onOpenEditMode) {
        onOpenEditMode(true);
      }
      openEditMode();
    };
    const onCloseEditModeHandler = () => {
      if (onOpenEditMode) {
        onOpenEditMode(false);
      }
      closeEditMode();
    };

    return (
      <>
        {editMode ? (
          <StyledEditableElement css={[editModeStyles]}>
            {editView({
              value,
              setValue,
              closeEditMode: onCloseEditModeHandler,
              cancel: () => {
                onCloseEditModeHandler();
                setValue(initialValue);
              },
            })}
          </StyledEditableElement>
        ) : (
          <StyledEditableElement
            css={styles}
            needEditHover={!onlyView}
            onClick={() => !onlyView && onOpenEditModeHandler()}
          >
            {isEmpty(value) && emptyView ? emptyView() : showView(value)}
          </StyledEditableElement>
        )}
      </>
    );
  },
) as <T>(props: EditableElementInterface<T>) => any;
