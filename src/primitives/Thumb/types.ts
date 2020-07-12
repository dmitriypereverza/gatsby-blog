import React from "react";

import { Colors } from "libs/styles";

export interface ThumbInterface {
  as?: React.FC<any>;
  image: string;
  placeholder?: string;
  smallPlaceholder?: boolean;
  blueBorder?: boolean;
  size: number;
  color?: Colors;
  styles?: any[];
  appendProps?: any;
}
