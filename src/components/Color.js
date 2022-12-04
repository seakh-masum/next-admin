const Color = ({ value, type }) => {
  return (
    <>
      {type == 'box' ? (
        <span className="flex flex-row gap-2 justify-center items-center">
          <div
            className="py-[1px] px-3 rounded-md text-sm"
            style={{ backgroundColor: value }}
          >{value.toUpperCase()}</div>
        </span>
      ) : (
        <span className="flex justify-center">
          <div
            className="w-9 h-9 rounded-full"
            style={{ backgroundColor: value }}
          ></div>
        </span>
      )}
    </>
  );
};

export default Color;