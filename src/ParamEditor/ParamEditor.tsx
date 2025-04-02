import React, { ChangeEvent } from "react";

import { Props, State, Param, Model } from "./types";

import "./ParamEditor.css";

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: this.initializeValues(props.params, props.model),
    };
  }

  private initializeValues(
    params: Param[],
    model: Model
  ): Record<number, string> {
    return params.reduce((acc, param) => {
      const paramValue = model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      acc[param.id] = paramValue ? paramValue.value : "";
      return acc;
    }, {} as Record<number, string>);
  }

  private handleChange =
    (paramId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      this.setState((prevState) => ({
        values: { ...prevState.values, [paramId]: event.target.value },
      }));
    };

  public getModel(): Model {
    return {
      paramValues: Object.entries(this.state.values).map(
        ([paramId, value]) => ({
          paramId: Number(paramId),
          value,
        })
      ),
    };
  }

  render() {
    return (
      <section className="section">
        {this.props.params.map((param) => (
          <div className="field" key={param.id}>
            <label htmlFor={`param-${param.id}`}>{param.name}</label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={this.state.values[param.id] || ""}
              onChange={this.handleChange(param.id)}
            />
          </div>
        ))}
      </section>
    );
  }
}

export default ParamEditor;
