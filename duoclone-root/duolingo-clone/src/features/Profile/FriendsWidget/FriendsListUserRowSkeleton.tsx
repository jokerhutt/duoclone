export function FriendsListUserRowSkeleton() {
  return (
    <div className="w-full flex py-2">
      <div className="w-20">
        <img
          className="w-11 h-11 object-cover rounded-full"
          src="https://www.benjaminmoore.com.au/cdn/shop/products/444A50_1200x.png?v=1634146628"
        />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xl rounded-2xl text-duoGrayLocked bg-duoGrayLocked">
          ______
        </p>
      </div>
    </div>
  );
}
