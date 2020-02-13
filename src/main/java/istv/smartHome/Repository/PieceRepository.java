package istv.smartHome.Repository;

import istv.smartHome.Entity.Piece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PieceRepository extends JpaRepository<Piece,Long> {
    @Query("select P from Piece P where P.id_piece like : x ")
    public Piece GetPieceById(@Param("x") Long id_piece);

}
