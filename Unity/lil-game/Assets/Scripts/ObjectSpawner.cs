using System;
using Boo.Lang;
using UnityEngine;

public class ObjectSpawner : MonoBehaviour {

	public GameObject prefab;
	public float offset;
	public float lvlCount;
	
	[SerializeField]
	private Ground ground;
	[SerializeField]
	private float thresh = 0.5f;
	[SerializeField]
	private PlayerController player;
	private float initialX;
	private List<GameObject> obstacles = new List<GameObject>();

	void Start () {
		SpawnObstacle();
		ground = FindObjectOfType<Ground>();
		player = FindObjectOfType<PlayerController>();
		initialX = transform.position.x;
	}
	
	void Update () {
		if(transform.position.z < ground.transform.position.z) {
			transform.position = new Vector3(transform.position.x + UnityEngine.Random.Range(-3f, 3f), transform.position.y, transform.position.z + offset);
			SpawnObstacle();
			lvlCount++;
			transform.position = new Vector3(initialX, transform.position.y, transform.position.z);
		}

		if(lvlCount % 50 == 0) {
			thresh -= 0.01f;
			player.speedZ += 0.01f;
		}

		for (int i =0; i < obstacles.Count; i++) {
			GameObject obstacle = obstacles[i];

			if(obstacle.transform.position.z < player.transform.position.z) {
				Destroy(obstacle);
				obstacles.Remove(obstacle);
			}
		}
	}

	void SpawnObstacle() {
		GameObject left = Instantiate(prefab, new Vector3(transform.position.x - 3, transform.position.y, transform.position.z), Quaternion.identity);
		GameObject center = Instantiate(prefab, transform.position, Quaternion.identity);
		GameObject right = Instantiate(prefab, new Vector3(transform.position.x + 3, transform.position.y, transform.position.z), Quaternion.identity);

		right.SetActive(UnityEngine.Random.Range(0f, 1f) > thresh);
		center.SetActive(UnityEngine.Random.Range(0f, 1f) > thresh);
		left.SetActive(UnityEngine.Random.Range(0f, 1f) > thresh);
		if(right.activeSelf) {
			obstacles.Add(right);
		} else {
			Destroy(right);
		}

		if(center.activeSelf) {
			obstacles.Add(center);
		} else {
			Destroy(center);
		}

		if(left.activeSelf) {
			obstacles.Add(left);
		} else {
			Destroy(left);
		}
	}
}
