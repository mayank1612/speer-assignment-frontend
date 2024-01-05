import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ContactCard from "../components/ContactCard";
import { BASE_URL } from "../assets/constants";
import { strictFetch } from "../utils/strictFetch";
import { groupCallsByDate } from "../utils/groupCallsByDate";

const Activity = () => {
  const [value, setValue] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCallHistory() {
    const queryData = await strictFetch(`${BASE_URL}/activities`);

    const allCalls = groupCallsByDate(queryData);
    setCallHistory(allCalls);
    setLoading(false);

    return queryData;
  }

  useEffect(() => {
    fetchCallHistory();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="activity-wrapper " className=" bg-white">
      <div id="subHeader" className="flex">
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
        <div id="contact-list" className="bg-gray-100 p-5">
          {callHistory.map((history) => {
            const { date, callHistoryByDate } = history;

            // show call history if call logs are present in given date for which is_archived is false
            return (
              callHistoryByDate.length > 0 && (
                <div key={date}>
                  <div id="date-seperator" className="flex justify-center my-2">
                    <div className="border-dotted border-2 border-gray-500 my-3 w-full"></div>
                    <div className="mx-3 text-nowrap text-sm text-gray-500 font-semibold">
                      {date}
                    </div>
                    <div className="border-dotted border-2 border-gray-400 my-3 w-full"></div>
                  </div>

                  {callHistoryByDate.map((callData) => {
                    return (
                      <div key={callData.id} className="my-2" id="contact-card">
                        <ContactCard callData={callData} />
                      </div>
                    );
                  })}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Activity;
