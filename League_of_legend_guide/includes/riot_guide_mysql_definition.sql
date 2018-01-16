create database league_of_legend_guide;

CREATE TABLE `Build_guide` (
  `build_id` int(11) NOT NULL auto_increment,
  `champion_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_create` varchar(64) NOT NULL,
  `build_name` varchar(64) NOT NULL,
  PRIMARY KEY  (`build_id`),
  FOREIGN KEY (`champion_id`) REFERENCES champions(champion_id);
  FOREIGN KEY (`user_id`) REFERENCES users(user_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `spell_set` (
  `spell_set_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `spell_id_1` int(11) NOT NULL,
  `spell_id_2` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  PRIMARY KEY  (`spell_set_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
  FOREIGN KEY (`spell_id_1`) REFERENCES spell(spell_id);
  FOREIGN KEY (`spell_id_2`) REFERENCES spell(spell_id);
  FOREIGN KEY (`note_id`) REFERENCES note(note_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `item_set` (
  `item_set_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `set_name` varchar(64) NOT NULL,
  `detail_id` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  PRIMARY KEY  (`item_set_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
  FOREIGN KEY (`detail_id`) REFERENCES item_detail_set(detail_id);
  FOREIGN KEY (`note_id`) REFERENCES note(note_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `item_detail_set` (
  `detail_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `items` TEXT NOT NULL,
  PRIMARY KEY  (`detail_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `vs_champion` (
  `vs_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `vs_champion_id` varchar(64) NOT NULL,
  `diffculty` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  PRIMARY KEY  (`item_set_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
  FOREIGN KEY (`detail_id`) REFERENCES item_detail_set(detail_id);
  FOREIGN KEY (`note_id`) REFERENCES note(note_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `skill_order_table` (
  `order_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `level` varchar(64) NOT NULL,
  `skill` int(11) NOT NULL,
  PRIMARY KEY  (`order_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `background` (
  `background_id` int(11) NOT NULL auto_increment,
  `build_id` int(11) NOT NULL,
  `skin_id` int(11) NOT NULL,
  PRIMARY KEY  (`background_id`),
  FOREIGN KEY (`build_id`) REFERENCES Build_guide(build_id);
  FOREIGN KEY (`skin_id`) REFERENCES skin(skin_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `skin` (
  `skin_id` int(11) NOT NULL auto_increment,
  `champion_id` int(11) NOT NULL,
  `skin_name` varchar(64) NOT NULL,
  PRIMARY KEY  (`skin_id`),
  FOREIGN KEY (`champion_id`) REFERENCES champions(champion_id);
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `spell` (
  `spell_id` int(11) NOT NULL auto_increment,
  `spell_data` TEXT NOT NULL,
  PRIMARY KEY  (`spell_id`),
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `champions` (
  `champion_id` int(11) NOT NULL auto_increment,
  `champion_name` varchar(64) NOT NULL,
  `data` TEXT NOT NULL,
  PRIMARY KEY  (`champion_id`),
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL auto_increment,
  `item` varchar(64) NOT NULL,
  `total_cost` int(11) NOT NULL,
  `base_cost` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL,
  `description` TEXT NOT NULL,
  `tags` TEXT NOT NULL,
  `from` varchar(128) NOT NULL,
  `into` varchar(128) NOT NULL,
  PRIMARY KEY  (`item_id`),
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `note` (
  `note_id` int(11) NOT NULL auto_increment,
  `note` TEXT NOT NULL,
  PRIMARY KEY  (`note_id`),
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `msg` text NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
*/
