package istv.smartHome.Service;

import istv.smartHome.Entity.User;
import istv.smartHome.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
}
