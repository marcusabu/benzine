import axios from "axios";
import { useQuery } from "react-query";
import { TOpendataResponse } from "@/types";

const fetchPrices = async () => {
  const response: TOpendataResponse = await axios.get(
    "https://opendata.cbs.nl/ODataApi/odata/80416ned/TypedDataSet"
  );

  const prices = response.data.value;
  return prices[prices.length - 1];
};

export const usePriceData = () => {
  const {
    data: priceData,
    isLoading,
    isSuccess,
    isError
  } = useQuery(["priceData"], fetchPrices);

  return {
    priceData,
    isLoading,
    isSuccess,
    isError
  };
};
