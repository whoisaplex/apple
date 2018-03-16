<?php
namespace App\Library;

class Quest
{
  protected $quests = [
    // type 0
    [],
    // type 1
    [
      'xp' => 30,
      'currency' => '300'
    ],
    // type 2
    [
      'xp' => 20,
      'currency' => '200'
    ],

    // type 3
    [
      'xp' => 10,
      'currency' => '100'
    ]
  ];

  public $currency;
  public $xp;

  public function __construct(int $type)
  {
    $quest = $this->getQuestByType($type);

    $this->currency = $quest['currency'];
    $this->xp = $quest['xp'];
  }

  // Retreive the Quest by its type
  public function getQuestByType(int $type)
  {
    return $this->quests[$type];
  }
}
