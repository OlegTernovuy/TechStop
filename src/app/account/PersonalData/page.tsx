import PersonalContactInfo from "./(Forms)/PersonalContactInfo";
import PersonalDeliveryAddress from "./(Forms)/PersonalDeliveryAddress";
import PersonalLoginInfo from "./(Forms)/PersonalLoginInfo";

const PersonalData = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <PersonalContactInfo />
      <PersonalLoginInfo />
      <PersonalDeliveryAddress/>
    </div>
  );
};

export default PersonalData;
