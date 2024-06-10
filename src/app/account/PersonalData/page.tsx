import PersonalContactInfo from "./(Forms)/PersonalContactInfo";
import PersonalDeliveryAddress from "./(Forms)/PersonalDeliveryAddress";

const PersonalData = () => {

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <PersonalContactInfo />
      <PersonalDeliveryAddress/>
    </div>
  );
};

export default PersonalData;
