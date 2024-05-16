import axios from "axios";
import { useQuery } from "react-query";
import { TOpendataResponse } from "@/types";

const fetchBenzinePrijs = async () => {
  const response: TOpendataResponse = await axios.get(
    "https://opendata.cbs.nl/ODataApi/odata/80416ned/TypedDataSet"
  );

  const prijzen = response.data.value;
  return prijzen[prijzen.length - 1];
};


export const useBenzinePrijs = () => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["prijsmetingen"],
    fetchBenzinePrijs
  );

  return {
    prijsMeting: data,
    isLoading,
    isSuccess,
    isError
  };
};
