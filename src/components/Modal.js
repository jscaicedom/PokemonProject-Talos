import React from "react";
import { connect } from "react-redux";
import general from "../style/general.module.css";
import modal from "../style/modal.module.css";
import { Bar } from "react-chartjs-2";
import { comparePokemon, removeCompare } from "../redux/actions/compareAction";

const Modal = (props) => {
  if (props.select.isSelected) {
    const data = {
      labels: props.select.descriptions[props.select.indexActual].stats.map(
        (stat) => {
          return stat.stat.name;
        }
      ),
      datasets: [
        {
          label: props.select.actualPokemon,
          backgroundColor: "rgb(56,120,107)",
          hoverBackgroundColor: "rgba(56,120,107,0.5)",
          data: props.select.descriptions[props.select.indexActual].stats.map(
            (stat) => {
              return stat.base_stat;
            }
          ),
        },
      ],
    };
    if (props.compare.isCompared) {
      data.datasets.push({
        label: props.compare.compareTo.name,
        backgroundColor: "rgb(73,91,41)",
        hoverBackgroundColor: "rgba(73,91,41,0.5)",
        data: props.compare.compareTo.stats.map((stat) => {
          return stat.base_stat;
        }),
      });
    }

    const options = {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: "Stats",
        fontSize: 20,
        fontColor: "black",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const handleCompare = () => {
      props.dispatch(
        comparePokemon(
          props.select.descriptions[props.select.indexActual],
          props.select.genre[props.select.indexActual]
        )
      );
    };

    const handleClose = () => {
      if (props.compare.isCompared) props.dispatch(removeCompare());
    };

    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.select.actualPokemon.toUpperCase()}
              </h5>
              {props.compare.isCompared ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  &nbsp; VS. {props.compare.compareTo.name.toUpperCase()}
                </h5>
              ) : (
                <button
                  onClick={handleCompare}
                  data-dismiss="modal"
                  className={modal["compare-button"]}
                >
                  Compare to...
                </button>
              )}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {props.compare.isCompared ? (
              <div className={"modal-body"}>
                <div
                  className={
                    modal["images-container"] + " " + modal["general-container"]
                  }
                >
                  <div className={general["image-container"]}>
                    <img
                      className={general["pokemon-image"]}
                      alt={props.select.actualPokemon}
                      src={
                        props.select.descriptions[props.select.indexActual]
                          .sprites.front_default
                      }
                    />
                  </div>
                  <div className={general["image-container"]}>
                    <img
                      className={general["pokemon-image"]}
                      alt={props.compare.compareTo.name}
                      src={props.compare.compareTo.sprites.front_default}
                    />
                  </div>
                </div>
                <div className={modal["compare-container"]}>
                  <div className={modal["compare-description"]}>
                    <p className={modal["compare-text"]}>
                      {
                        props.select.descriptions[props.select.indexActual]
                          .height
                      }
                      m
                    </p>
                    <p className={modal["compare-text"]}>
                      {
                        props.select.descriptions[props.select.indexActual]
                          .weight
                      }
                      kg
                    </p>
                    <p className={modal["compare-text"]}>
                      {props.select.genre[props.select.indexActual]}
                    </p>

                    {props.select.descriptions[
                      props.select.indexActual
                    ].abilities.map((ability) => (
                      <p
                        className={modal["compare-text"]}
                        key={ability.ability.url}
                      >
                        {ability.ability.name}
                      </p>
                    ))}
                  </div>
                  <div className={modal["compare-description"]}>
                    <p className={modal["modal-subtitle"]}>Height</p>
                    <p className={modal["modal-subtitle"]}>Weight</p>
                    <p className={modal["modal-subtitle"]}>Gender</p>
                    <p className={modal["modal-subtitle"]}>Abilities</p>
                  </div>
                  <div className={modal["compare-description"]}>
                    <p className={modal["compare-text"]}>
                      {props.compare.compareTo.height}m
                    </p>
                    <p className={modal["compare-text"]}>
                      {props.compare.compareTo.weight}
                      kg
                    </p>
                    <p className={modal["compare-text"]}>
                      {props.compare.genre}
                    </p>

                    {props.compare.compareTo.abilities.map((ability) => (
                      <p
                        className={modal["compare-text"]}
                        key={ability.ability.url}
                      >
                        {ability.ability.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={"modal-body " + modal["general-container"]}>
                <div
                  className={
                    general["image-container"] + " " + modal["image-container"]
                  }
                >
                  <img
                    className={general["pokemon-image"]}
                    alt={props.select.actualPokemon}
                    src={
                      props.select.descriptions[props.select.indexActual]
                        .sprites.front_default
                    }
                  />
                </div>
                <div>
                  <p className={modal["description-container"]}>
                    {props.select.description[props.select.indexActual]}
                  </p>
                  <div className={modal["data-container"]}>
                    <div className={modal["data-box"]}>
                      <p className={modal["modal-subtitle"]}>Height</p>
                      <p>
                        {
                          props.select.descriptions[props.select.indexActual]
                            .height
                        }
                        m
                      </p>
                    </div>
                    <div className={modal["data-box"]}>
                      <p className={modal["modal-subtitle"]}>Weight</p>
                      <p>
                        {
                          props.select.descriptions[props.select.indexActual]
                            .weight
                        }
                        kg
                      </p>
                    </div>
                    <div className={modal["data-box"]}>
                      <p className={modal["modal-subtitle"]}>Gender</p>
                      <p>{props.select.genre[props.select.indexActual]}</p>
                    </div>
                    <div className={modal["data-box"]}>
                      <p className={modal["modal-subtitle"]}>Abilities</p>
                      <ul>
                        {props.select.descriptions[
                          props.select.indexActual
                        ].abilities.map((ability) => (
                          <li key={ability.ability.url}>
                            {ability.ability.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={modal["data-box"]}>
                      <p className={modal["modal-subtitle"]}>Type</p>
                      <ul>
                        {props.select.descriptions[
                          props.select.indexActual
                        ].types.map((type) => (
                          <li key={type.type.url}>{type.type.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="modal-footer"
              style={{ width: "100%", height: "20rem" }}
            >
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default connect((state) => {
  return state;
})(Modal);
