import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

function DisappearingAlert({ alertText }) {
  return (
    <div>
      <Alert status="success" variant="subtle">
        <AlertIcon />
        {alertText}
      </Alert>
    </div>
  );
}

export default DisappearingAlert;
