import { Box, Button, CircularProgress, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ARCHIVED_CALLS_TAB_INDEX,
  BASE_URL,
  NOT_ARCHIVED_CALLS_TAB_INDEX,
} from "../assets/constants";
import { strictFetch } from "../utils/strictFetch";
import { groupCallsByDate } from "../utils/groupCallsByDate";
import ContactCardsByDate from "../components/ContactCardsByDate";
import { isAnyCallArchived } from "../utils/isAnyCallArchived";
import { isAnyCallNotArchived } from "../utils/isAnyCallNotArchived";

const Activity = () => {
  const [value, setValue] = useState(NOT_ARCHIVED_CALLS_TAB_INDEX);
  const [callHistory, setCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [isResetBtnLoading, setIsResetBtnLoading] = useState(false);

  const isArchivedTab = value === ARCHIVED_CALLS_TAB_INDEX;

  async function fetchCallHistory() {
    const queryData = await strictFetch(`${BASE_URL}/activities`);

    const allCalls = groupCallsByDate(queryData);
    setCallHistory(allCalls);
    setLoading(false);
  }

  async function resetAllArchivedCalls() {
    await strictFetch(`${BASE_URL}/reset`, "PATCH");

    // Redirect to Inbox tab
    setTimeout(() => {
      setIsReset(false);
      setIsResetBtnLoading(false);
      setValue(
        value === NOT_ARCHIVED_CALLS_TAB_INDEX
          ? ARCHIVED_CALLS_TAB_INDEX
          : NOT_ARCHIVED_CALLS_TAB_INDEX
      );
    }, 2000);
  }

  useEffect(() => {
    fetchCallHistory();
  }, [value]);

  useEffect(() => {
    if (isReset) {
      resetAllArchivedCalls();
    }
  }, [isReset]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="activity-wrapper " className=" bg-white">
      <div id="sub-header" className="flex">
        <div className="flex items-center py-2 px-5 border-solid rounded-br-full w-2/5 shadow-lg font-bold text-gray-600">
          Activity
        </div>
        <div>
          <Box>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="Inbox"
                id="inbox"
                disableRipple
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Archived"
                id="archived"
                disableRipple
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
        </div>
      </div>
      {loading ? (
        <div className="flex h-96 bg-gray-100 justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div id="activity-body" className="bg-gray-100 p-5">
          <div id="contact-list" className="bg-gray-100">
            {callHistory.map((history) => {
              const { date, callHistoryByDate } = history;
              const { archived, notArchived } = callHistoryByDate;
              const callLogs = isArchivedTab ? archived : notArchived;
              return (
                <ContactCardsByDate
                  key={date}
                  date={date}
                  callLogs={callLogs}
                />
              );
            })}
          </div>

          {isArchivedTab && !isAnyCallArchived(callHistory) && (
            <div className="flex my-5 justify-center"> No Data Available </div>
          )}

          {!isArchivedTab && !isAnyCallNotArchived(callHistory) && (
            <div className="flex my-5 justify-center"> No Data Available </div>
          )}

          <div className="my-5">
            <Button
              fullWidth
              variant="contained"
              disabled={isResetBtnLoading}
              onClick={() => {
                setIsReset(true);
                setIsResetBtnLoading(true);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
