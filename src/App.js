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

        <FormAddFriend />
        {/*reusing the Button with Add Friend as children props*/}
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
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
      {/*using the component Button with the children props*/}
      <Button>Select</Button>
    </li>
  );
}
//since we will need this button in many places,let's create one with the children props
//here the children props is Select
function Button({ children }) {
  return <button classname="button">{children}</button>;
}
//building the forms
function FormAddFriend() {
  return (
    <form classname="form-add-friend">
      <label>👬 Friend Name</label>
      <input type="text" />
      <label>🌅 IMAGE URL</label>
      <input TYPE="text" />
      {/*here the children props is Add*/}
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form classname="form-split-bill">
      <h2>Split bill with X</h2>
      <label>💰 Bill value</label>
      <input TYPE="text" />

      <label>🧍‍♂️ Your expense</label>
      <input TYPE="text" />

      <label>👬 X's expense</label>
      <input TYPE="text" disabled />
      <label>💰 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      {/*here the children props is Add*/}
      <Button>Split bill</Button>
    </form>
  );
}
