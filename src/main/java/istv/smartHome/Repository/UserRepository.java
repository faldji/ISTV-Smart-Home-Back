package istv.smartHome.Repository;

import istv.smartHome.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface UserRepository extends CrudRepository<User,Long> {
    User getUserById(long id);
    User getUserByDeviceId(String deviceId);
    Collection<User> getUsersBy();
}
