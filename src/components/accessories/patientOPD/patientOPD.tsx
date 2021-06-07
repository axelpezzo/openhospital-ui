import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { createOpd, createOpdReset } from "../../../state/opds/actions";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import { OpdDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";

const PatientOPD: FunctionComponent<TProps> = ({
  createOpd,
  createOpdReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const { t } = useTranslation();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      createOpdReset();
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createOpdReset]);

  const onSubmit = (opd: OpdDTO) => {
    setShouldResetForm(false);
    createOpd(opd);
  };

  return (
    <div className="patientSummary">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.saveopd")}
        resetButtonLabel={t("common.discard")}
        isLoading={false}
      />
    </div>
  );
};
const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: state.opds.createOpd === "LOADING",
  hasSucceeded: state.opds.createOpd.status === "SUCCESS",
  hasFailed: state.opds.createOpd.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  createOpd,
  createOpdReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientOPD);
