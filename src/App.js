import { useState } from "react";

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
//since we will need this button in many places,let's create one with the children props
//here the children props is Select
function Button({ children, onClick }) {
  return (
    <button classname="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  //lifting state in the app in order to display new Friend
  const [friends, setFriends] = useState(initialFriends);
  //conditionally show addFriend form
  //1.create a new piece of state
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    //call back function which takes the current input and the new state will be the opposite of that
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    //each time we add a new friend we wand the addFriend form to disappear
    setShowAddFriend(false);
  }
  return (
    <div classname="app">
      <div classname="sidebar">
        <FriendsList friends={friends} />
        {/*2. use the piece of state showAddFriend to conditionall show the form using the && operatot*/}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/*reusing the Button with Add Friend as children props*/}
        {/*3. step when we update the state by clicking on the button to show addFriend, use onClick handler
        Also istead of showing add friend when it is open, it should show close
        so conditionally render the text Add Friend*/}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function FriendsList({ friends }) {
  // const friends = initialFriends;
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

//building the forms
function FormAddFriend({ onAddFriend }) {
  //adding a new Friend
  //1.define the state
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    //guard close to prevent submitting nothing;
    if (!name || !image) return;
    const id = crypto.randomUUID();
    //create a new friend object to be added to the list
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    // console.log(newFriend);
    //instead of logging it to the console, we call the function with the new fried
    onAddFriend(newFriend);
    //after submitting the name and image, we should go back to default
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    //step 3.listen to onSubmit event
    <form classname="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend Name</label>
      {/*2.adding the value and listen to onChange*/}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌅 IMAGE URL</label>
      <input
        TYPE="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
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
