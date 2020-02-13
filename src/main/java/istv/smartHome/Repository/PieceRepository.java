package istv.smartHome.Repository;

import istv.smartHome.Entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PieceRepository extends JpaRepository<Piece,Long> {
    @Override
    List<Piece> findAll();

}
