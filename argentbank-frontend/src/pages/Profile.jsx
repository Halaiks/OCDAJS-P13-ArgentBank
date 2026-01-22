import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/userSlice";
import { useState } from "react";
import { updateUserProfile } from "../store/userSlice";


export default function Profile() {

  const dispatch = useDispatch();
  // Récupération des données du profil utilisateur depuis le store Redux
  const { profile, loading, error } = useSelector((state) => state.user);
  // États locaux pour la gestion de l'édition du profil
  const [isEditing, setIsEditing] = useState(false);
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

// Récupération du profil utilisateur au chargement du composant
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  // Gestion des modifications du profil utilisateur
  const handleEdit = () => {
  setFirstName(profile.firstName);
  setLastName(profile.lastName);
  setIsEditing(true);
};
// Gestion de la sauvegarde des modifications du profil utilisateur
  const handleSave = (e) => {
  e.preventDefault();
  dispatch(updateUserProfile({ firstName, lastName }));
  setIsEditing(false);
};
  return (
    <main className="main bg-dark">
      <div className="header">
        {/* Affichage du profil ou du formulaire d'édition */}
        {!isEditing && (
  <>
    <h1>
      Welcome back
      <br />
      {profile?.firstName} {profile?.lastName}!
    </h1>
    <button
      className="edit-button"
      onClick={() => setIsEditing(true)}
    >
      Edit Name
    </button>
  </>
)}

{isEditing && (
  <form onSubmit={handleSave} className="edit-name-form">
    <div className="input-wrapper">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>

    <button type="submit" className="edit-button">
      Save
    </button>
    <button
  className="edit-button"
  onClick={handleEdit}
>
      Cancel
    </button>
  </form>
)}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}