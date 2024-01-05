import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../assets/constants";
import { strictFetch } from "../utils/strictFetch";
import DetailCard from "../components/DetailCard";
import { Button, CircularProgress } from "@mui/material";

const Details = () => {
  const [callDetails, setCallDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [triggerArchiveCall, setTriggerArchiveCall] = useState(false);
  const [isArchiveCallLoading, setIsArchiveCallLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleRedirect = () => {
    navigate(`/`, { replace: false });
  };

  async function fetchCallDetails() {
    const queryData = await strictFetch(`${BASE_URL}/activities/${id}`);
    setCallDetails(queryData);
    setLoading(false);

    return queryData;
  }

  async function actionToArchiveCall() {
    const variables = {
      is_archived: true,
    };
    await strictFetch(`${BASE_URL}/activities/${id}`, "PATCH", variables);
    setIsArchiveCallLoading(false);
  }

  useEffect(() => {
    if (!isArchiveCallLoading) {
      fetchCallDetails();
    }
  }, [isArchiveCallLoading]);

  useEffect(() => {
    if (triggerArchiveCall) {
      actionToArchiveCall();
    }
  }, [triggerArchiveCall]);

  return (
    <div id="details-wrapper" key={JSON.stringify(callDetails)}>
      <div id="subHeader" className="flex  bg-white">
        <div
          onClick={handleRedirect}
          className="flex items-center py-2 px-5 border-solid rounded-br-full w-2/5 h-[48px] shadow-lg font-bold text-gray-600 cursor-pointer"
        >
          <ArrowBackIosIcon sx={{ width: "20px" }} />
          <div className="mb-[1px]"> Details </div>
        </div>
      </div>
      {loading ? (
        <div className="flex h-36 bg-gray-100 justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <DetailCard callDetails={callDetails} />
          <div id="archive-call-action" className="mx-2">
            {callDetails.is_archived && (
              <Button
                fullWidth
                variant="contained"
                disabled={isArchiveCallLoading}
                onClick={() => {
                  setTriggerArchiveCall(true);
                  setIsArchiveCallLoading(true);
                }}
              >
                Archive Call
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
