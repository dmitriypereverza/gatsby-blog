import React, { ReactNode } from "react";
import styled from "styled-components/macro";

import ScrollView from "primitives/ScrollView";

import ContentLoader from "components/ContentLoader";

import { backgroundColor, borderRadius, boxShadow } from "libs/styles";
import withPerformance from "libs/decorators/performance/withPerformance";

const StyledScrollView = styled(ScrollView)`
  > :first-child {
    padding: 4px 0;
  }
`;

interface SuggestListInterface<T> {
  suggests: T[];
  suggestHeight: number;
  suggestWidth: string | number;
  emptySuggestElement?: ReactNode;
  elementsFullHeight: number;
  styles?: any;
  renderSuggest: (suggest: T, key: number) => JSX.Element;
  suggestsLoading?: boolean;
}

function SuggestList<T>({
  suggests,
  styles,
  suggestHeight,
  suggestWidth,
  emptySuggestElement,
  elementsFullHeight,
  renderSuggest,
  suggestsLoading = false,
}: SuggestListInterface<T>) {
  if ((!suggests || !suggests.length) && !emptySuggestElement) return null;

  return (
    <StyledScrollView
      css={[
        styles,
        backgroundColor("white"),
        borderRadius(5),
        boxShadow([0, 0, 16, "blackTransparent"]),
      ]}
      style={{
        width: suggestWidth,
        maxHeight: suggestHeight,
        height: elementsFullHeight,
      }}
    >
      {suggestsLoading ? (
        <ContentLoader />
      ) : suggests.length ? (
        suggests.map(renderSuggest)
      ) : (
        emptySuggestElement
      )}
    </StyledScrollView>
  );
}

export default withPerformance(["styles", "suggestWidth", "suggestHeight"])(
  SuggestList,
);
