import React from "react";

export class RenderQueue {
  private elements: JSX.Element[] = [];
  private iterationChangeTimer = null;

  constructor(private elementsOnIteration = 20) {}

  addElement = (element: JSX.Element) => {
    this.elements.push(element);
  };

  addArray = (elements: JSX.Element[]) => {
    this.elements.push(...elements);
  };

  get length() {
    return this.elements.length;
  }

  private getLastIterationElementIndex(iteration: number) {
    return iteration * this.elementsOnIteration;
  }

  private RenderElements = () => {
    const [iteration, setIteration] = React.useState(1);

    React.useEffect(() => {
      if (this.length === 0) return;
      if (this.getLastIterationElementIndex(iteration) < this.elements.length) {
        this.iterationChangeTimer = setTimeout(setIteration, 0, iteration + 1);
      }
    }, [iteration]);

    this.useDestroy();

    return (
      <>
        {this.elements.slice(0, this.getLastIterationElementIndex(iteration))}
      </>
    );
  };

  render = () => {
    clearTimeout(this.iterationChangeTimer);
    return <this.RenderElements />;
  };

  destroy = () => {
    this.elements = [];
    clearTimeout(this.iterationChangeTimer);
  };

  useDestroy = () => {
    React.useEffect(() => this.destroy, []);
  };
}
