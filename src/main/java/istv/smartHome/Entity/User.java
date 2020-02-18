package istv.smartHome.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;
    private String deviceId;
    private boolean isActive;
    private boolean isFirstUsage;

    public long getId() {
        return id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isFirstUsage() {
        return isFirstUsage;
    }

    public void setFirstUsage(boolean firstUsage) {
        isFirstUsage = firstUsage;
    }
}
