import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'hsla(0, 0.00%, 0.00%, 0.50)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    height: '50%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E1FF00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#797979',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  leftSocialButton: {
    marginRight: 5,
  },
  socialIcon: {
    width: 140,
    height: 24,
    resizeMode: 'contain',
  },
  privacyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#000',
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
});
