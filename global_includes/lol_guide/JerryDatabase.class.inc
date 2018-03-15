<?php
if ( !class_exists('Database') ){
  include "config.inc";
  class Database
  {
    // set variable
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;
    private $dbh;
    private $error;
    private $stmt;
    //function begin
    /*---------------------------------------------------------------------------*/
    public function __construct()
    {
          // Set DSN
      $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
      // Set options
      $options = array
      (
          PDO::ATTR_PERSISTENT => true,
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
      );
      try
      {
        $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
      }
      // Catch any errors
      catch (PDOException $e)
      {
          $this->error = $e->getMessage();
      }
      // prepare funciton

    }
    //------------------------ end of construc-------------------------------------
    public function query($query)
    {
      $this->stmt = $this->dbh->prepare($query);
      return $this;
    }
    //Bind the inputs with the placeholers we put in place
    public function bind($param, $value, $type = null)
    {
      if (is_null($type))
      {
        switch (true)
        {
          case is_int($value):
            $type = PDO::PARAM_INT;
            break;
          case is_bool($value):
            $type = PDO::PARAM_BOOL;
            break;
          case is_null($value):
            $type = PDO::PARAM_NULL;
            break;
          default:
            $type = PDO::PARAM_STR;
        }
      }
      $this->stmt->bindValue($param, $value, $type);
      return $this;
    }

    public function bindAll($input) {
        foreach ($input AS $param => $value) {
            $this->bind($param,$value);
        }
        return $this;
    }
    // the execute method executes the prepared statement
    public function execute()
    {
        return $this->stmt->execute();
    }
    //return an array of the result set rows. First we run the execute method, then we return the results.
    public function resultset()
    {
      $this->execute();
      return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    //Single method simply returns a single record from the database. Again, first we run the execute method, then we return the single result
    public function single()
    {
      $this->execute();
      return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function rowCount()
    {
      return $this->stmt->rowCount();
    }
    public function lastInsertId()
    {
      return $this->dbh->lastInsertId();
    }
    public function beginTransaction()
    {
      return $this->dbh->beginTransaction();
    }
    public function endTransaction()
    {
      return $this->dbh->commit();
    }
    public function cancelTransaction()
    {
      return $this->dbh->rollBack();
    }
    public function debugDumpParams()
    {
      return $this->stmt->debugDumpParams();
    }
  }

}

?>
