{request.authorEmail === auth.currentUser.email ? (
    <TouchableOpacity
      style={{
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 5,
      }}
      onPress={() => {
        delete_request(request.order);
      }}>
      <Image
        style={{height: 25, width: 25, marginVertical: 10}}
        source={require('../../images/bin.png')}
      />
    </TouchableOpacity>
  ) : (
    <></>
  )}