import { useQuery } from "@tanstack/react-query";

export interface MetalsResponse {
  status: string;
  currency: string;
  unit: string;
  metals: {
    gold: number;
    silver: number;
    platinum: number;
    palladium: number;
    lbma_gold_am?: number;
    lbma_gold_pm?: number;
    lbma_silver?: number;
    lbma_platinum_am?: number;
    lbma_platinum_pm?: number;
    lbma_palladium_am?: number;
    lbma_palladium_pm?: number;
    mcx_gold?: number;
    mcx_gold_am?: number;
    mcx_gold_pm?: number;
    mcx_silver?: number;
    mcx_silver_am?: number;
    mcx_silver_pm?: number;
    ibja_gold?: number;
    copper?: number;
    aluminum?: number;
    lead?: number;
    nickel?: number;
    zinc?: number;
    lme_copper?: number;
    lme_aluminum?: number;
    lme_lead?: number;
    lme_nickel?: number;
    lme_zinc?: number;
  };
  currencies: {
    [key: string]: number;
  };
  timestamps: {
    metal: string;
    currency: string;
  };
}

const API_KEY = "MPAPQMWK8UWPENKHXP30749KHXP30";
const BASE_URL = "https://api.metals.dev/v1/latest";

export const fetchLiveGoldPrice = async (): Promise<MetalsResponse> => {
  const response = await fetch(
    `${BASE_URL}?api_key=${API_KEY}&currency=INR&unit=g`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch live gold prices");
  }
  return response.json();
};

export function useLiveGoldPrice() {
  return useQuery<MetalsResponse, Error>({
    queryKey: ["liveGoldPrice"],
    queryFn: fetchLiveGoldPrice,
    refetchInterval: 60 * 1000, // Refetch every minute
    staleTime: 30 * 1000,       // Consider data stale after 30 seconds
  });
}
