import React, { FC } from "react";

import Wrapper from "primitives/Wrapper";

import { ChatInterface } from "components/Discuss/types";
import ThumbChatIcons from "components/ThumbChat/ThumbIconsChat";

import { position } from "libs/styles";

export default function IconsThumbHOC<T extends { chat: ChatInterface }>(
  Cmp: FC<T>,
) {
  return (
    props: T & {
      iconsShowConfig: {
        isFixedShow: boolean;
        isNotifyShow: boolean;
      };
    },
  ) => {
    const { isFixedShow, isNotifyShow } = props.iconsShowConfig;

    return (
      <Wrapper styles={[position("relative")]}>
        {isFixedShow || isNotifyShow ? (
          <ThumbChatIcons isFixed={isFixedShow} isNotifyOff={isNotifyShow} />
        ) : null}

        <Cmp {...props} />
      </Wrapper>
    );
  };
}
