import { useEffect, useRef, useState } from "react";
import { LearnHeader } from "../../../components/Header/LearnHeader";
import { SectionHeader } from "../organisms/SectionHeader";
import { UnitPath } from "../../Unit/UnitPath";
import { useUnitObserver } from "../../../util/UnitObserver";
import { mockUnits, type UnitType } from "../../../Types/UnitType";
import { GET_UNIT_IDS, GET_UNITS_FROM_IDS } from "../../../util/paths";
import { parseIdsToRequestParam } from "../../../util/pathParsers";

const currentUnit = "";

export function SectionPage() {


  const [units, setUnits] = useState<UnitType[]>([]);

  const [currentUnit, setCurrentUnit] = useState("");

  const unitRefs = useRef<(HTMLElement | null)[]>([]);

  useUnitObserver(unitRefs, units.map((unit) => unit.title), setCurrentUnit);

  const [unitIds, setUnitIds] = useState<number[]>([]);

  useEffect(() => {
    fetch(GET_UNIT_IDS(1))
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setUnitIds(data);
      });
  }, []);

  useEffect(() => {
    if (!(unitIds.length > 0)) return;
    console.log("Fetching");
    const ids = parseIdsToRequestParam("unitIds", unitIds);
    fetch(GET_UNITS_FROM_IDS(ids))
      .then((res) => res.json())
      .then((data: UnitType[]) => setUnits(data))
  }, [unitIds]);

  useEffect(() => {
    if (units.length > 0 && currentUnit != "") {
      setCurrentUnit(units[0].title);
    }
  }, [units]);

  return (
    <>
      <LearnHeader />
      <SectionHeader currentUnit={currentUnit} />
      <div className="w-full h-full overflow-auto">
        {unitIds && unitIds.length > 0 && units && units.length > 0 && (
          <>
            {unitIds.map((id, index) => (
              <div
                key={index}
                ref={(el) => {
                  unitRefs.current[index] = el;
                }}
              >
                <UnitPath id={id} index={index} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
