useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          let response = await axios.get(
            `http://localhost:5000/api/checkrole/${user.phoneNumber}`
          );
          if (response.data.role) {
            localStorage.setItem('role', response.data.role);
          }catch (error) {
          console.error("Error checking role:", error);
        }
      }
    }, [currentUser]);