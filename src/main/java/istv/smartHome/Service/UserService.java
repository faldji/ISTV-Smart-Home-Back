package istv.smartHome.Service;

import istv.smartHome.Entity.User;
import istv.smartHome.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user){
       return userRepository.save(user);
   }
   public User findUserByDeviceId(String deviceId){
       return userRepository.getUserByDeviceId(deviceId);
   }

    public boolean deleteUser(User user) {
       userRepository.delete(user);
       return findUserByDeviceId(user.getDeviceId()) == null;
    }

    public Collection<User> findAll() {
        return (Collection<User>) userRepository.findAll();
    }
}
