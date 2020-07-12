import React, { ReactNode } from "react";

import { TypographyLink } from "primitives/Typography";
import Wrapper from "primitives/Wrapper";
import Button, { ButtonType } from "primitives/Button";
import Thumb from "primitives/Thumb";

import {
  ai,
  Aligns,
  borderNone,
  flex,
  fullWidth,
  jc,
  lastChild,
  marginBottom,
  marginRight,
  marginTop,
} from "libs/styles";

import { getUserURL } from "modules/linkGenerator";

import SuggestInterface from "types/SuggestInterface";

interface UsersListInterface {
  users: (SuggestInterface & { avatar: string })[];
  title?: ReactNode;
  outerStyles?: any[];
  withButton?: boolean;
  onAddUser?: () => void;
  textButton?: string;
}

const UsersList = ({
  users,
  title = null,
  outerStyles = [],
  withButton = false,
  onAddUser,
  textButton,
}: UsersListInterface) => {
  return (
    <Wrapper styles={[fullWidth, outerStyles]}>
      {!!title && title}
      <Wrapper styles={[fullWidth]}>
        {users.map(({ code, title, avatar }) => {
          const userURL = getUserURL(code);
          return (
            <Wrapper
              key={code}
              styles={[
                flex,
                ai(Aligns.CENTER),
                jc(Aligns.START),
                fullWidth,
                marginBottom(8),
                lastChild([marginBottom(0)]),
              ]}
            >
              {avatar && (
                <TypographyLink to={userURL} styles={marginRight(8)}>
                  <Thumb image={avatar} size={24} />
                </TypographyLink>
              )}

              <TypographyLink to={userURL}>{title}</TypographyLink>
            </Wrapper>
          );
        })}
      </Wrapper>
      {withButton && (
        <Button
          outerStyles={[marginTop(16), borderNone]}
          iconLeft="addUser"
          type={ButtonType.text}
          onClick={onAddUser}
        >
          {textButton}
        </Button>
      )}
    </Wrapper>
  );
};

export default React.memo(UsersList);
