import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonImg,
  IonItem,
  IonLoading,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../styles/WalkMyDog.scss";
import "../styles/Account.scss";
import { format, utcToZonedTime } from "date-fns-tz";
import { writeDogData } from "../utils/utils";

const WalkMyDog: React.FC = (dog: any) => {
  const dogObject: any = dog.dog;
  console.log("dogObject :>> ", dogObject);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [hasDog, setHasDog] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [formattedDate, setFormattedDate] = useState<any>("");
  const [showLoading, setShowLoading] = useState(true);

  let date: string = new Date().toISOString();

  const confirmDogAvailability = async () => {
    await writeDogData(dogObject, formattedDate);
    setShowToast(true);
    setColor("success");
    setMessage(`${dogObject.dogName} disponible le ${formattedDate}`);
  };

  const formatDate = () => {
    if (selectedDate) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date(selectedDate);
      const zonedTime = utcToZonedTime(date, userTimeZone);
      const formatZonedTime = format(zonedTime, "dd-MM-yyyy à HH:mm", {
        timeZone: userTimeZone,
      });

      setFormattedDate(formatZonedTime);
    }
  };
  useEffect(() => {
    formatDate();
  }, [selectedDate]);
  return (
    <>
      <IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          position="middle"
          color={color}
          duration={500000000}
          buttons={[
            {
              icon: "close",
              role: "Fermer",
              handler: () => {},
            },
          ]}
        />
        {dogObject ? (
          hasDog ? (
            <>
              <IonGrid className="no-dog-container">
                <div className="user-name ion-text-center ion-margin-top">
                  <IonText className="text-xxl">
                    Quand veux-tu que{" "}
                    <IonText color="primary">
                      {dogObject ? dogObject?.dogName : "ton chien"}
                    </IonText>{" "}
                    soit promené ?
                  </IonText>
                </div>
                <IonRow className="ion-align-self-center ion-justify-content-center ion-text-center">
                  <IonCol>
                    <IonText className="text-xl">Choisis un horaire !</IonText>
                  </IonCol>
                </IonRow>
                <IonRow
                  style={{ marginLeft: "10px" }}
                  className="ion-align-self-center ion-justify-content-center ion-text-center"
                >
                  <IonCol>
                    <IonDatetime
                      min={date}
                      locale="fr-FR"
                      value={selectedDate}
                      onIonChange={(e) => setSelectedDate(e.detail.value!)}
                      presentation="time-date"
                      name="dateSetByUser"
                      minute-values="0,15,30,45"
                      first-day-of-week="1"
                    />
                  </IonCol>
                </IonRow>
                {formattedDate ? (
                  <IonRow class="ion-justify-content-center ion-text-center">
                    <IonCol size="8">
                      <IonText>
                        Confirmer que{" "}
                        <IonText color="primary">{dogObject?.dogName}</IonText>{" "}
                        est disponible le
                        <br />
                        <b>{Object.values(formattedDate)} ?</b>
                      </IonText>
                      <IonButton onClick={confirmDogAvailability}>
                        Confirmer
                      </IonButton>
                    </IonCol>
                  </IonRow>
                ) : null}
              </IonGrid>
            </>
          ) : (
            <IonGrid className="no-dog-container">
              <div className="background-container">
                <IonImg
                  className="background-cover"
                  src="assets/images/walkmydogbanner.jpg"
                />
              </div>
              <div className="user-name ion-text-center ion-margin-top">
                <IonText className="text-xxl">
                  Bienvenue <IonText color="primary">Germain</IonText>
                </IonText>
              </div>

              <div className="ion-text-center ion-padding-top top-text">
                <IonText className="text-lg">
                  Il semble que tu n'as pas ton compagnon canin à quatre pattes
                  d'inscris, remédions à ça !
                </IonText>
              </div>

              <IonRow className="ion-align-self-center">
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle color="primary">
                        Inscris ton chien !
                      </IonCardTitle>
                      <IonItem
                        href="/page/RegisterDog"
                        detail={true}
                        lines="none"
                      >
                        <IonCardContent className="ion-padding-top">
                          Inscris ton chien pour que d'autres utilisateurs
                          puissent le promener quand tu le rend disponible !
                        </IonCardContent>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>

                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>En savoir plus sur le concept</IonCardTitle>
                      <IonItem href="/page/Password" detail={true} lines="none">
                        <IonCardContent className="ion-padding-top">
                          Tu désires en savoir plus concernant Ilda ? Tu ne sais
                          pas ce qu'il se passera une fois ton chien inscris ?
                          Pas de problème nous pouvons répondres à tes questions
                          !
                        </IonCardContent>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          )
        ) : (
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Chargement en cours..."}
            duration={3000}
          />
        )}
      </IonContent>
    </>
  );
};

export default WalkMyDog;
