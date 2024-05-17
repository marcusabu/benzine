import { useMemo, useState } from "react";
import { usePriceData } from "@/hooks/usePriceData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export default function CostCalculator() {
  const [distanceDriven, setDistanceDriven] = useState<number>();
  const [consumption, setConsumption] = useState(10);
  const { priceData, currentPrice, isLoading, isSuccess } = usePriceData();

  const totalCost = useMemo(() => {
    if (!distanceDriven || !currentPrice?.BenzineEuro95_1) {
      return null;
    }

    return (
      (distanceDriven / consumption) *
      currentPrice.BenzineEuro95_1
    ).toFixed(2);
  }, [distanceDriven, currentPrice?.BenzineEuro95_1, consumption]);

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-primary-foreground">
      <div className="w-2xl flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-0">
              <CardDescription>Benzine prijs</CardDescription>
              {isLoading && (
                <CardTitle>
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-primary" />
                </CardTitle>
              )}
              {isSuccess && (
                <CardTitle className="text-2xl">
                  &euro; {currentPrice?.BenzineEuro95_1.toFixed(2)}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className={"pb-0"}>
              <ResponsiveContainer width={"100%"} height={40}>
                <LineChart width={300} height={40} data={priceData}>
                  <Line
                    dot={false}
                    type="monotone"
                    dataKey="BenzineEuro95_1"
                    stroke="hsl(var(--primary))"
                    strokeWidth={1}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-6">
              <CardDescription>Totale kosten</CardDescription>
              <CardTitle className="text-2xl">
                {totalCost ? <>&euro; {totalCost}</> : <>-</>}
              </CardTitle>
            </CardHeader>
          </Card>
          <div>
            <Label htmlFor="km">Hoeveel kilometer gereden?</Label>
            <Input
              type="number"
              id="km"
              inputMode="numeric"
              pattern="[0-9]*"
              value={distanceDriven === 0 ? undefined : distanceDriven}
              onChange={(e) => setDistanceDriven(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="verbruik">Gemiddeld verbruik</Label>
            <Select
              onValueChange={(e) => setConsumption(Number(e))}
              defaultValue={"10"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Verbuik" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, index) => {
                  const number = index + 5;
                  return (
                    <SelectItem key={number} value={number.toString()}>
                      1 op {number}
                    </SelectItem>
                  );
                })}
              </SelectContent>
              <p className="py-1 text-center text-xs italic text-muted-foreground">
                Met 1 liter benzine kun je {consumption}km rijden
              </p>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
