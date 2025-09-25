export function FriendsListUserRow() {
  return (
    <div className="w-full flex py-2">
      <div className="w-20">
        <img
          className="w-11 h-11 object-cover rounded-full"
          src="/pfp/av2.png"
        />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xl text-white">Jokerhut</p>
        <p className="font-light text-duoGrayButtonText">100 XP</p>
      </div>
    </div>
  );
}
