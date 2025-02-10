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
  //1.selecting Friend using lifting state
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    //call back function which takes the current input and the new state will be the opposite of that
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    //each time we add a new friend we wand the addFriend form to disappear
    setShowAddFriend(false);
  }
  //3. updating the selectedFriend,first create a handler function
  //set the selectedFriend to the friend object that it receives
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    //enableclose button to set it back to null
    // currently selected does not always exist hence use of cur?.id
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    //in order not to display the two forms at the same time
    setShowAddFriend(false);
  }
  return (
    <div classname="app">
      <div classname="sidebar">
        {/*whenever we click select, the friend object will be passed into the function*/}
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
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
      {/*2. when no friend is selected, we dont want this form to show up
      we created a state now we use it by conditionally rendering the splitBillForm*/}
      {/*in order to pass the name of the selected friend into the splitBillForm wher e it is marked x,pass it on FormSplitBill*/}
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
//4. now in the friendList we need to receive onSelection props
function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <li>
          <Friend
            friend={friend}
            key={friend.id}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        </li>
      ))}
    </ul>
  );
}
//5. pass it also into the friend
function Friend({ friend, onSelection, selectedFriend }) {
  //similarily as cur? selectedFriend does not always exist hence selectedFriend?.id
  const isSelected = selectedFriend?.id === friend.id;
  console.log(isSelected);
  return (
    //use it to conditionally render selected class using javascript mode
    <li classname={isSelected ? "selected" : ""}>
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
      {/*using the component Button with the children props
      6. this is well we need to call onSelection function and pass in the selected friend
      */}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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
function FormSplitBill({ selectedFriend }) {
  //controlled element
  //using "" because these are input field
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  //derived state
  //if there is a bill the result is bill-paidByUser, else "";
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form classname="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        TYPE="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♂️ Your expense</label>
      <input
        TYPE="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👬 {selectedFriend.name}'s expense</label>
      {/*let's use it by only specifying the value*/}
      <input TYPE="text" disabled value={paidByFriend} />
      <label>💰 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      {/*here the children props is Add*/}
      <Button>Split bill</Button>
    </form>
  );
}
