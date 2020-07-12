import React, { FC } from "react";

import Wrapper from "primitives/Wrapper";

import { ChatInterface } from "components/Discuss/types";

import { padding, position, width } from "libs/styles";

import BadgeCounterComponent, {
  BadgeContainerCounter,
} from "../../BadgeCounter";

function BadgeHOC<T extends { chat: ChatInterface }>(Cmp: FC<T>) {
  return function (props: T & { isShowCounter: boolean }) {
    return (
      <Wrapper styles={[position("relative")]}>
        {props.isShowCounter ? (
          <BadgeContainerCounter>
            <BadgeCounterComponent
              value={props.chat.unreadMessageCount}
              styles={[width("inherit"), padding("0 9px")]}
              active
            />
          </BadgeContainerCounter>
        ) : null}
        <Cmp {...props} />
      </Wrapper>
    );
  };
}

export default BadgeHOC;
