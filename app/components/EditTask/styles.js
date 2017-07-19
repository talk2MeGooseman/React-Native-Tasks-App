import { StyleSheet } from 'react-native'; 
 
const styles = StyleSheet.create({ 
  editTaskContainer: { 
    flex: 1, 
    paddingTop: 20 // TODO Replace with proper logic 
  }, 
  editTaskText: { 
    fontSize: 36 
  },
  clearDateButtonContainer: { 
    flex: 1 
  },
  switchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    maxHeight: 50, 
    padding: 10 
  }, 
  switchText: { 
    fontSize: 16 
  }, 
  textInput: { 
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 40, 
    margin: 10, 
    padding: 10 
  },
  actionContainer: {
    flex: 2
  },
  saveContainer: {
    flex: 1
  }
}) 
 
export default styles; 