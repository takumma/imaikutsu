import firebase from './firebase'

const graphCollection = firebase.firestore().collection('graphs')

const getGraph = async (user: string) => {

  console.log(user)

  return await graphCollection.where("screen_name", "==", `${user}`).limit(1).get().then((snapshot) => {
    let result = []
    snapshot.forEach((doc) => {
      const mentalValues = doc.data().mentalValues
      if(mentalValues) result = mentalValues
    })
    return result
  })
  .catch((err) => {
    console.error(err)
    return []
  });
}

export default getGraph