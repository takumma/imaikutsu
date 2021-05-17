import firebase from './firebase'

const getGraph = async (user: string) => {
  const collection = firebase.firestore().collection('graphs')

  console.log(collection)
  console.log(user)

  return await collection.where("screen_name", "==", `${user}`).limit(1).get().then((snapshot) => {
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