import { useMemo, useState } from "react";
import { usePriceData } from "@/hooks/usePriceData";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CostCalculator() {
  const [distanceDriven, setDistanceDriven] = useState<number>();
  const [consumption, setConsumption] = useState(10);
  const { priceData, isLoading, isSuccess } = usePriceData();

  const totalCost = useMemo(() => {
    if (!distanceDriven || !priceData?.BenzineEuro95_1) {
      return null;
    }

    return (
      distanceDriven *
      (consumption / 100) *
      priceData.BenzineEuro95_1
    ).toFixed(2);
  }, [distanceDriven, consumption, priceData]);


  return (
    <div className="flex h-[100dvh] justify-center items-center flex-col bg-primary-foreground">
      <div className="flex flex-col max-w-4xl min-w-2xl gap-8">
        <div className="flex gap-4">
          <Card>
            <CardHeader className="pb-6">
              <CardDescription>Benzine prijs</CardDescription>
              {isLoading && <CardTitle>
                <div className="border-t-primary h-10 w-10 animate-spin rounded-full border-4 border-slate-300" />
              </CardTitle>}
              {isSuccess && <CardTitle className="text-2xl">&euro; {priceData?.BenzineEuro95_1.toFixed(2)}</CardTitle>}
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-6">
              <CardDescription>Totale kosten</CardDescription>
              <CardTitle className="text-2xl">{totalCost ? (<>&euro; {totalCost}</>) : <>-</>}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="km">Hoeveel kilometer gereden?</Label>
            <Input
              type="number"
              id="km"
              inputMode="numeric" pattern="[0-9]*"
              value={distanceDriven === 0 ? undefined : distanceDriven}
              onChange={(e) => setDistanceDriven(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="verbruik">Gemiddeld verbruik (l/100km)</Label>
            <Select onValueChange={(e) => setConsumption(Number(e))} defaultValue={"10"}>
              <SelectTrigger>
                <SelectValue placeholder="Verbuik" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, index) => {
                  const number = index + 5;
                  return (
                    <SelectItem key={number} value={number.toString()}>
                      {number}L (1 op {Math.round(100 / number)})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

