import React from "react";
import { connect } from "react-redux";
import general from "../style/general.module.css";
import modal from "../style/modal.module.css";

const Comparemodal = ({ select, compare }) => {
  if (select.isSelected) {
    return (
      <div className="modal-body">
        <div
          className={
            modal["images-container"] + " " + modal["general-container"]
          }
        >
          <div className={general["image-container"]}>
            <img
              className={general["pokemon-image"]}
              alt={select.currentPokemon}
              src={
                select.descriptions[select.currentIndex].sprites.front_default
              }
            />
          </div>
          <div className={general["image-container"]}>
            <img
              className={general["pokemon-image"]}
              alt={compare.compareTo.name}
              src={compare.compareTo.sprites.front_default}
            />
          </div>
        </div>
        <div className={modal["compare-container"]}>
          <div className={modal["compare-text"]}>
            {select.descriptions[select.currentIndex].height}m
          </div>
          <div
            className={modal["modal-subtitle"] + " " + modal["compare-space"]}
          >
            Height
          </div>
          <div className={modal["compare-text"]}>
            {compare.compareTo.height}m
          </div>

          <div className={modal["compare-text"]}>
            {select.descriptions[select.currentIndex].weight}
            kg
          </div>
          <div
            className={modal["modal-subtitle"] + " " + modal["compare-space"]}
          >
            Weight
          </div>
          <div className={modal["compare-text"]}>
            {compare.compareTo.weight}
            kg
          </div>

          <div className={modal["compare-text"]}>
            {select.genders[select.currentIndex]}
          </div>
          <div
            className={modal["modal-subtitle"] + " " + modal["compare-space"]}
          >
            Gender
          </div>
          <div className={modal["compare-text"]}>{compare.gender}</div>

          <div className={modal["compare-abilities"]}>
            {select.descriptions[select.currentIndex].abilities.map(
              (ability) => (
                <div
                  className={modal["compare-text"]}
                  key={ability.ability.url}
                >
                  {ability.ability.name}
                </div>
              )
            )}
          </div>
          <div
            className={modal["modal-subtitle"] + " " + modal["compare-space"]}
          >
            Abilities
          </div>
          <div className={modal["compare-abilities"]}>
            {compare.compareTo.abilities.map((ability) => (
              <div className={modal["compare-text"]} key={ability.ability.url}>
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    compare: state.compare,
  };
};

export default connect(mapStateToProps)(Comparemodal);
