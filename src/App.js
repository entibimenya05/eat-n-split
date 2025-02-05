const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  return (
    <div classname="app">
      <div classname="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}
function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <li>
          <Friend friend={friend} key={friend.id} />
        </li>
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p classname="red">
          {/*to get rid of the - sign use Math.abs*/}
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {/*copy the above 3 times and paste it below*/}
      {friend.balance > 0 && (
        <p classname="green">
          {/*to get rid of the - sign use Math.abs*/}
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>
          {/*to get rid of the - sign use Math.abs*/}
          You and {friend.name} are even ${Math.abs(friend.balance)}
        </p>
      )}
      <button classname="button">Select</button>
    </li>
  );
}
