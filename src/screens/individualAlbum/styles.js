import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  albumNameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  actionsView: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  tracksView: {
    backgroundColor: 'white',
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // height: 500,
  },
  playAllChecklist: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  playAll: {
    backgroundColor: '#797bbd',
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    padding: 5,
    borderRadius: 10,
  },
});
