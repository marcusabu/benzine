import axios from "axios";
import { useQuery } from "react-query";
import { TOpendataResponse } from "@/types";

const fetchPrices = async () => {
  const response: TOpendataResponse = await axios.get(
    "https://opendata.cbs.nl/ODataApi/odata/80416ned/TypedDataSet",
  );

  return response?.data?.value;
};

export const usePriceData = () => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["priceData"],
    fetchPrices,
  );

  const priceData = data ? data.filter((_, index) => index % 100 === 0) : [];

  return {
    priceData,
    currentPrice: priceData[priceData.length - 1],
    isLoading,
    isSuccess,
    isError,
  };
};
