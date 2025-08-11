type UnitBreakType = {
    lesson: string
}

export function UnitBreak ({lesson}: UnitBreakType) {

    return (

    <div className="w-full flex items-center text-duoGrayText">
      <div className="w-full">
        <hr />
      </div>
      <p className="text-duoGrayText px-2 whitespace-nowrap w-full text-xl font-bold">{lesson}</p>
      <div className="w-full">
        <hr />
      </div>
    </div>

    )

}