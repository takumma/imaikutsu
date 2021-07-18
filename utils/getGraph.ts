import firebase from './firebase'

const graphCollection = firebase.firestore().collection('graphs')

const getGraph = async (user: string) => {

  return await graphCollection.where("screen_name", "==", `${user}`).limit(1).get().then((snapshot) => {
    let result = []
    snapshot.forEach((doc) => {
      const mentalValues: any[] | null = doc.data().mentalValues
      if(mentalValues) result = mentalValues.map((mentalValue) => {
        const timeStamp = mentalValue['time_stamp'].split('-');
        mentalValue['time_stamp'] = `${timeStamp[1]}/${timeStamp[2]}`
        return mentalValue
      })
    })
    return result
  })
  .catch((err) => {
    console.error(err)
    return []
  });
}

export default getGraph